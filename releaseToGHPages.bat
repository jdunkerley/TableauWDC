cd dist
git init
git add .
git commit -m "Deploy to GH Pages"
git push --force --quiet "https://github.com/jdunkerley/TableauWDC" master:gh-pages
