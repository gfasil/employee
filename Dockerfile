FROM openjdk:8-jdk-alpine as build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x ./mvnw
# download the dependency if needed or if the pom file is changed
RUN ./mvnw dependency:go-offline -B

COPY src src

RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

# Production Stage for Spring boot application image
FROM openjdk:8-jre-alpine as production
ARG DEPENDENCY=/app/target/dependency

# Copy the dependency application file from build stage artifact
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
#//\\ARG JAVA_HOME=PROGRA~1/Java/jdk1.8.0_111
#COPY config.crt ${JAVA_HoME}/jre/lib/security/
RUN \
    cd rogram files/Java/jdk1.8.0_111/jre/lib/security \
    && keytool -keystore cacerts -storepass changeit -noprompt -trustcacerts -importcert -alias config -file config.crt
# Run the Spring boot application
ENTRYPOINT ["java", "-cp", "app:app/lib/*","com.fh.skilltracker.SkilltrackerApplication"]