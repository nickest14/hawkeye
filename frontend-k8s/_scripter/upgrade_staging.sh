

#!/bin/bash
parent_path="$( cd "$(dirname "$0")" ; pwd -P )"
project_path=$parent_path/../..
cd $project_path

RANDOM_DIR='asdasd'

dist_path="/usr/src/app/dist"
echo $b
for i in 0 1; do
echo $i
echo $dist_path
echo $project_path
kubectl --namespace=staging-frontend cp dist front-end-$i:/tmp/$RANDOM_DIR
kubectl --namespace=staging-frontend exec -it front-end-$i -- "mkdir" "-p" $dist_path/staging
kubectl --namespace=staging-frontend exec -it front-end-$i -- "rsync" "-av" "--remove-source-files" "--delete" "/tmp/$RANDOM_DIR/" "$dist_path/staging"
kubectl --namespace=staging-frontend exec -it front-end-$i -- "rm" "-rf" "/tmp/$RANDOM_DIR"
done