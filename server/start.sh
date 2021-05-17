# Run Sequalize's migrations.
echo "-----> Running application migrations"
npx sequelize db:migrate
echo ""

# Run Sequalize's seeds.
echo "-----> Running application seeds"
npx sequelize db:seed:all
echo "<----- Seeds created"

npm run start