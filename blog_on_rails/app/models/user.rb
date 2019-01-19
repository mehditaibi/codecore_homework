class User < ApplicationRecord
    has_many :posts, dependent: :nullify 
    has_many :comments, dependent: :nullify 

    validates(
        :email, 
        uniqueness: true, 
        format: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
    )

        has_secure_password
end
