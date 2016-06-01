#!/bin/bash

# become the man
sudo su

ROOTFOLDER='/data/sample/api-docs'
REPOSITORY='git@bitbucket.org:https://github.com/clatko/slate-php.git'

REGENERATE="$1"

echo $REGENERATE;

# create the directory if does not exist yet
if [ -d $ROOTFOLDER/releases ]; then 
	echo dir $ROOTFOLDER/releases already exist;
else
	mkdir -p $ROOTFOLDER/releases
fi;

# open the releases folder
cd $ROOTFOLDER/releases

# create the folder from the date
DIR=$(date +%Y%m%d%H%s)

if [ -d $DIR ]; then 
	echo dir $DIR already exist;
else
	mkdir $DIR
fi;

# open the new folder
cd $DIR

# clone the repo
git clone $REPOSITORY .
git checkout master

# prepare for release
rm -rfv _dev
rm -rfv .git*
rm -rfv deploy
rm -rfv Gruntfile.js
rm -rfv package.json
rm -rfv README.md
rm -rfv source

# deal with cache
#if [ $REGENERATE == "true" ]; then 
#	echo regenerating cache
#else
	cp -pr $ROOTFOLDER/www/cache $ROOTFOLDER/releases/$DIR/
#fi;

# unlink the current folder
unlink $ROOTFOLDER/www

# create the link to put the thing live
ln -s $ROOTFOLDER/releases/$DIR $ROOTFOLDER/www

# set permission
#sudo chmod -R 777 $ROOTFOLDER/v1/releases/git/$DIR
#sudo chmod -R 777 $ROOTFOLDER/v1/current

#stop being the man
exit;


exit;


# clear the git releases folder
# cd $ROOTFOLDER/v1/releases/git
# sudo rm -rf `ls -t | tail -n +3`
