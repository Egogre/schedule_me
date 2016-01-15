class User < ActiveRecord::Base
  has_many :schedules
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  has_secure_password
end
