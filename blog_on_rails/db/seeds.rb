# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all
Comment.destroy_all
User.destroy_all

PASSWORD = "password"

super_user = User.create(
    name: "Admin",
    email: "admin@admin.com",
    password: "admin",
    admin: true
)

10.times do
    name = Faker::Name.name
    email = Faker::Internet.email
    password = PASSWORD 
    u = User.create(
        name: name,
        email: email,
        password: password
    )
end

users = User.all

50.times do 
    created_at = Faker::Date.backward(365 * 2)
    title = Faker::Lorem.sentence 
    body = Faker::Lorem.paragraph_by_chars
    p = Post.create( 
        title: title,
        body: body,
        created_at: created_at,
        user: users.sample
    )
  

    if p.valid?
        rand(0..10).times do
            p.comments << Comment.new(
                body: Faker::GreekPhilosophers.quote,
                user: users.sample
            )
        end
    end
end

posts = Post.all.count
comments = Comment.all.count
users = User.all.count

puts "Generated #{posts} posts"
puts "generated #{comments} comments"
puts "generated #{users} users"

