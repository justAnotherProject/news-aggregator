# core test suite that defines useful functions
HOST="http://127.0.0.1:3000"

#set -o history -o histexpand
resp=""

# Expect test to pass
# kurl method url data args
kurl(){ # Note DATA arg cannot contain spaces.
    curl_call "$1" "$2" "$3" "$4"
    handle 1 0
    return $?
}

# Allow test to pass or fail
# hurl method url data args
hurl(){
    curl_call "$1" "$2" "$3" "$4"
    handle 1 1
    return $?
}

# Expect test to fail
# furl method url data args
furl(){
    curl_call "$1" "$2" "$3" "$4"
    handle 0 1
    return $?
}

# Handle a response
# handle allowPass allowFail
handle(){
    accept="return 0"
    reject="exit 1"
    if [ "$1" -eq "1" ]; then
        onPass=$accept
    else 
        onPass=$reject
    fi

    if [ "$2" -eq "1" ]; then
        onFail=$accept
    else 
        onFail=$reject
    fi

    # Success!
	( ( echo $resp | jq --raw-output '.success' 2> /dev/null | grep 'true' ) &> /dev/null ) && $onPass

    tput setaf 1 # red
	echo -n "Error: "

    # No reply - always quit
    [ "$resp" ] || ( echo "No response. Offline?" ; tput sgr0 ; exit 1 )
    # Non-JSON reply - fail
    isJson $resp || echo $resp && tput sgr0 && $onFail
    # Permission denied - fail
    isJson $resp '.error.message' && 
        echo $resp | jq -c '.error.message' | grep "Permission denied" && 
        red "Not admin or API not in debug mode." && tput sgr0 && $onFail
    # Other error - fail 
    echo $resp | jq -C '.'
    
    tput sgr0 # default
	$onFail
}

# curl_label method path data args
curl_label(){
	eval X="$1" 		 # Method
	eval P="$2" 		 # Path
    d="${3:-}"           # data
    F="${4:-}"           # Args

    tput setab 0 # black background
    echo -n "curl "
    if [ -n "$F" ]; then 
        echo -n "$F "
    fi
    tput sgr0 # default 
    echo -n "-s"
    tput setaf 3 # yellow
    echo -n "X $X "    
    tput setaf 2 # green
    echo -n "$HOST/$P"

    if [ -n "$d" ]; then 
        tput setaf 3 #yellow
        echo -n ' -H "Content-Type: application/json"'
        tput sgr0 # default 
        echo -n " -d '"
        echo -n $( echo $d | jq -cC '.' )
        echo -n "'"
    fi

    echo ""
    tput sgr0 # default
}

# curl_call method url data args
curl_call(){
	eval X="$1" 		 # Method
	eval P="$2" 		 # Path
    d="${3:-}"           # data
    F="${4:-}"           # Args

    curl_label "$1" "$2" "$3" "$4"

	if [ -z "$d" ]; then # Data
		resp=$( curl $F -sX $X $HOST/$P );
    else
		resp=$( curl $F -sX $X $HOST/$P -H "Content-Type: application/json" -d "$d" );
	fi
}

isJson(){ echo "$1" | jq -eM "${2:-"."}" &> /dev/null ; return $?; }
randStr(){ resp=`head /dev/urandom | tr -dc A-Za-z0-9 | head -c ${1:-'10'}` ; }
red() { echo "$(tput setaf 1)$*$(tput sgr0)"; }
magenta() { echo "$(tput setaf 5)$*$(tput sgr0)"; }
# Check that jq is installed to parse the JSON
( which jq &> /dev/null ) || ( echo "Please install jq via apt-get install jq" && exit 1 )
