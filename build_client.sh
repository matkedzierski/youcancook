#!/bin/bash
pushd ./ClientApp/dist/  >> /dev/null || exit 1
ng build
styleFile=$(echo ./*.css)
sed -i 's/:label-shown/.label-shown/' "$styleFile"
popd || exit 1
firebase deploy
