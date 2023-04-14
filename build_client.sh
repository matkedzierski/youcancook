#!/bin/bash
pushd ./ClientApp  >> /dev/null || exit 1
ng build
pushd ./dist  >> /dev/null || exit 1

sed -i 's/ type=\"text\/css\"//g' index.html

for i in ./*.css; do
  sed -i 's/:label-shown/.label-shown/g' "$i"
done

for i in ./main.*.js; do
  sed -i 's/c\.setAttribute("mat-spinner-animation",this._spinnerAnimationLabel),//g' "$i"
  sed -i 's/uf\.setAttribute("type","text\/css"),//g' "$i"
  sed -i 's/, W\.type="text\/css"//g' "$i"
done

popd || exit 1
popd || exit 1
firebase deploy
