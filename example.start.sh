# Uncomment in production
#export IS_PRODUCTION="random"
#export LOG_FILE="latest.log"

export BOT_TOKEN=""
export APPLICATION_ID=""
# Comment in production
export DEV_SERVER_ID=""

export VERSION="1.0.0"

# SMTP Setup
export SMTP_HOST="smtp.example.com"
export SMTP_PORT="465"
export SMTP_USER="no-reply@example.com"
export SMTP_PASS=""
export SMTP_ADDRESS="Example Name <no-reply@example.com>"
export SMTP_REPLY_TO="example@gmail.com"

# Separate multiple emails with a single space " "
export CC_EMAILS="example@example.com e@e.com"
export TEST_CC_EMAILS=""
export TEST_BCC_EMAILS=""

#Channel where messages will get sent
export CHANNEL_ID=""
export TEST_CHANNEL_ID=""

#Role to ping in discord message
export ROLE_ID=""
export TEST_ROLE_ID=""

yarn dev