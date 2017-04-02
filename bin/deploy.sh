#!/bin/bash

cd .. & tar dist -zcvf | ssh root@123.207.16.204 "cd /root/var"