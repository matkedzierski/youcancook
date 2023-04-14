#!/bin/bash
pushd ./ClientApp  >> /dev/null || exit 1
ng build
pushd ./dist  >> /dev/null || exit 1
styleFile=$(echo ./*.css)
sed -i 's/:label-shown/.label-shown/' "$styleFile"
sed -i 's/ type=\"text\/css\"//' index.html


for i in ./main.*.js; do
  sed -i 's/c\.setAttribute("mat-spinner-animation",this._spinnerAnimationLabel),//' "$i"
  sed -i 's/uf\.setAttribute("type","text\/css"),//' "$i"
done

popd || exit 1
popd || exit 1
firebase deploy
