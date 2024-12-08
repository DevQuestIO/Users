FROM quay.io/keycloak/keycloak:21.1.1

ENV KC_DB=cockroachdb
COPY ./custom-changelog/jpa-changelog-1.3.0.xml /opt/keycloak/custom-changelog/
ENV KC_LIQUIBASE_CHANGELOG=/opt/keycloak/custom-changelog/jpa-changelog-1.3.0.xml
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start-dev"]
