# remove junk
echo "STEP 1 : removing junk"
cd ./backend/
rm -rf /build 
rm -rf /node_modules
cd ..

# build front end
echo "STEP 2 : building front end"
cd ./frontend
npm install
npm run build
mv -vf ./build ../backend/

# build backend
echo "STEP 3 : building back end"
cd ../backend
npm install

echo "STEP 4 : BUILDING COMPLETE"


