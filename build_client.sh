#!/bin/bash
pushd ./ClientApp/dist/  >> /dev/null || exit 1
ng build
styleFile=$(echo ./*.css)
sed -i 's/:label-shown/.label-shown/' "$styleFile"
sed -i 's/ type=\"text\/css\"//' index.html
popd || exit 1
firebase deploy
