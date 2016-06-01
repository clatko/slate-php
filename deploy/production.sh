#!/bin/bash

ssh -i ~/.ssh/www-US.pem -l ubuntu ec2-ipaddress.amazonaws.com 'bash -s' < deploy.sh