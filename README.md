# jay-bot
[![Build Status](https://travis-ci.org/Kaelinator/jay-bot.svg?branch=master)](https://travis-ci.org/Kaelinator/jay-bot)

## Summary
Jay likes to send emails that require near-instantaneous responses. jay-bot is here to pick out the ones that need responding, and then automatically responds for you, all according to your spec!

  * Somewhat Secure
  * Machine Learning Email Analysis (Parallel Dots API)
  * Easily Configurable
  * Out-of-the-box Deployable

## Setup

All configuration options are available through a `.env` file in the root directory, or by setting environment variables manually.

#### Here's how it should look:
```
# Email account credentials
EMAIL_USER=judy@hopps.com
EMAIL_PASS=*********

# Hostname or IP address of the IMAP server
EMAIL_HOST=imap.gmail.com

# Port number of the IMAP server
EMAIL_PORT=993

# Email account to reply to
RECIPIENT=kaycee@tiger.com

# Parallel Dots API key
PARALLEL_DOTS_KEY=******************************

# Email account to inspect emails from
JAY=jay@gmail.com

# Sentences to check each sentence within an email against to determine whether or not to reply
TARGET_SENTENCES=Sentences should be separated by double pipes.||This is another sentence.

# How similar sentences must be in order to activate a reply
SIMILARITY_THRESHOLD=3

# Template to generate random responses using bracket expansion
RESPONSE_TEMPLATE={Hi Jay!|Hey, Jay!} {I would {like|love}|Sign me up|I volunteer} to return papers!

# Template to generate random subjects using bracket expansion
SUBJECT_TEMPLATE=Need someone to {pass out|return} {assignments|papers}?

# Whether or not to log a lot
DEBUG=true
```