# cowin-script
This script help in faster vaccine registration

# How it works
It will call you on the phone once there is available slots
There are existing solutions available but those might not working due rate limiting*

This script uses twilio API:

For using this script,you need to create twillo account(Trial account would work).
You need to get the trial phone number(This no will call you on your cellphone)


Please it requires two ENV

TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN

Once done Please make two change in script.js

1. Your no
2. Twillio no

Eg.

const to='+919876543210'; //edit your no you want to be called on
const from='+232132132321'//edit your no what you got from twillo


If you need any more help please mail me tarunrawat8787@gmail.com
