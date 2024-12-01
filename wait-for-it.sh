#!/bin/bash

cmdname=$(basename "$0")
TIMEOUT=120
QUIET=0

echoerr() {
    if [ "$QUIET" -ne 1 ]; then printf "%s\n" "$*" 1>&2; fi
}

usage() {
    exitcode="$1"
    cat << USAGE >&2
Usage:
    $cmdname host:port [-t timeout] [-- command args]
    -q | --quiet                        Don't output any status messages
    -t TIMEOUT | --timeout=timeout      Timeout in seconds, zero for no timeout
    -- COMMAND ARGS                     Execute command with args after the test finishes
USAGE
    exit "$exitcode"
}

wait_for() {
    local wait_host="$1"
    local wait_port="$2"
    local timeout="$3"

    echoerr "Waiting for $wait_host:$wait_port..."

    for i in $(seq 1 "$timeout"); do
        echoerr "Checking: $wait_host:$wait_port - attempt $i"
        if nc -z "$wait_host" "$wait_port" > /dev/null 2>&1; then
            echoerr "$wait_host:$wait_port is available after $i seconds"
            return 0
        fi
        sleep 1
    done
    echoerr "Operation timed out" >&2
    return 1
}

# Extract host and port from input
if [ "$#" -lt 1 ]; then
    usage 1
fi

if [[ "$1" != *:* ]]; then
    echoerr "Invalid host:port format"
    usage 1
fi

HOST=$(echo "$1" | cut -d : -f 1)
PORT=$(echo "$1" | cut -d : -f 2)
shift

# Debug output for host and port
echoerr "Host: $HOST"
echoerr "Port: $PORT"

# Process additional arguments
while [ $# -gt 0 ]; do
    case "$1" in
        -t)
            TIMEOUT="$2"
            if [ -z "$TIMEOUT" ]; then
                echoerr "Timeout value is required after -t"
                usage 1
            fi
            shift 2
            ;;
        --timeout=*)
            TIMEOUT="${1#*=}"
            shift 1
            ;;
        --)
            shift
            break
            ;;
        --help)
            usage 0
            ;;
        *)
            echoerr "Unknown argument: $1"
            usage 1
            ;;
    esac
done

# Debug output for timeout value
echoerr "Timeout: $TIMEOUT"

wait_for "$HOST" "$PORT" "$TIMEOUT" || exit 1

if [ $# -gt 0 ]; then
    exec "$@"
fi
