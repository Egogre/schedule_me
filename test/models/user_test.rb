require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "valid user with valid attributes" do
    user = User.new(first_name: "Test",
                    last_name: "User",
                    email: "testuser@mail.com",
                    password: "password")

    assert user.valid?
  end

  test "invalid user without valid attributes" do
    user1 = User.new(last_name: "User",
                    email: "testuser@mail.com",
                    password: "password")

    user2 = User.new(first_name: "Test",
                    email: "testuser@mail.com",
                    password: "password")

    user3 = User.new(first_name: "Test",
                    last_name: "User",
                    password: "password")

    user4 = User.new(first_name: "Test",
                    last_name: "User",
                    email: "testuser@mail.com")

    refute user1.valid?
    refute user2.valid?
    refute user3.valid?
    refute user4.valid?
  end

end
