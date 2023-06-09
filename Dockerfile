###################
# STAGE 1: builder
###################

# Build currently doesn't work on > Java 11 (i18n utils are busted) so build on 8 until we fix this
FROM adoptopenjdk/openjdk8:x86_64-debianslim-jre8u345-b01 as builder

WORKDIR /app/source

ENV FC_LANG en-US
ENV LC_CTYPE en_US.UTF-8

# bash:    various shell scripts
# wget:    installing lein
# git:     ./bin/version
# make:    backend building
# gettext: translations
RUN apt-get update && apt-get install -y coreutils bash git wget make gettext
RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs

# lein:    backend dependencies and building
ADD ./bin/lein /usr/local/bin/lein
RUN chmod 744 /usr/local/bin/lein
RUN lein upgrade

# install dependencies before adding the rest of the source to maximize caching

# backend dependencies
ADD project.clj .
RUN lein deps

# add the rest of the source
ADD . .

# build the studio
RUN cd frontend && npm run publish-code

# build the app
RUN bin/build

# ###################
# # STAGE 2: runner
# ###################

FROM adoptopenjdk/openjdk8:x86_64-debianslim-jre8u345-b01 as runner

LABEL org.opencontainers.image.source https://github.com/rapex-lab/rapex

ENV PATH="$PATH:/app/bin"
ENV PYTHONDONTWRITEBYTECODE=1
ENV FC_LANG en-US
ENV LC_CTYPE en_US.UTF-8

WORKDIR /app

RUN echo "**** Install dev packages ****" && \
    apt-get update && \
    apt-get install -y bash wget curl && \
    \
    echo "*** Install common development dependencies" && \
    apt-get install -y libmariadb-dev libxml2-dev libcurl4-openssl-dev libssl-dev && \
    \
    echo "**** Cleanup ****" && \
    apt-get clean

# Add rapex script and uberjar
RUN mkdir -p bin target/uberjar
COPY --from=builder /app/source/target/uberjar/rapex.jar /app/target/uberjar/
COPY --from=builder /app/source/bin /app/bin

# Expose our default runtime port
EXPOSE 3000

# Run it
ENTRYPOINT ["/app/bin/start"]