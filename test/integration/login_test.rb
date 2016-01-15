require 'test_helper'
require 'selenium-webdriver'

class LoginTest < Capybara::Rails::TestCase

  test "unauthenticated user is directed to login page" do
    visit "/"
    click_on("Start Scheduling!")

    assert_equal "/login", current_path
    assert page.has_content?("Log In")
  end

  test "new user can create account with valid attributes" do
    visit "/login"

    within("#signup") do
      fill_in "user_first_name", with: "Test"
      fill_in "user_last_name", with: "User"
      fill_in "user_email", with: "testuser@email.com"
      fill_in "user_password", with: "password"
      fill_in "user_password_confirmation", with: "password"
      click_on("Register")
    end

    assert_equal "/", current_path
    assert page.has_content?("Welcome Test")
    click_on("Start Scheduling!")
    assert_equal "/dashboard", current_path
  end

  test "new user cannot create account with missing name" do
    visit "/login"

    within("#signup") do
      fill_in "user_first_name", with: "Test"
      fill_in "user_email", with: "testuser@email.com"
      fill_in "user_password", with: "password"
      fill_in "user_password_confirmation", with: "password"
      click_on("Register")
    end

    assert_equal "/login", current_path
  end

  test "new user cannot create account with missing password" do
    visit "/login"

    within("#signup") do
      fill_in "user_first_name", with: "Test"
      fill_in "user_last_name", with: "User"
      fill_in "user_email", with: "testuser@email.com"
      fill_in "user_password_confirmation", with: "password"
      click_on("Register")
    end

    assert_equal "/login", current_path
  end

  test "unauthenticated user can sign in with valid attributes" do
    User.create(first_name: "Test",
                last_name: "User",
                email: "testuser@email.com",
                password: "password")
    visit "/login"

    within("#login") do
      fill_in "session_password", with: "password"
      fill_in "session_email", with: "testuser@email.com"
      click_on("Login")
    end

    assert_equal "/", current_path
  end

  test "unauthenticated user cannot sign in with missing name" do
    User.create(first_name: "Test",
                last_name: "User",
                email: "testuser@email.com",
                password: "password")
    visit "/login"

    within("#login") do
      fill_in "session_password", with: "password"
      click_on("Login")
    end

    assert_equal "/login", current_path
    assert page.has_content?("Invalid Login")
  end

  test "unauthenticated user cannot sign in with missing password" do
    User.create(first_name: "Test",
                last_name: "User",
                email: "testuser@email.com",
                password: "password")
    visit "/login"

    within("#login") do
      fill_in "session_email", with: "testuser@email.com"
      click_on("Login")
    end

    assert_equal "/login", current_path
    assert page.has_content?("Invalid Login")
  end

  test "authenticated user can logout" do
    User.create(first_name: "Test",
                last_name: "User",
                email: "testuser@email.com",
                password: "password")
    visit "/login"

    within("#login") do
      fill_in "session_email", with: "testuser@email.com"
      fill_in "session_password", with: "password"
      click_on("Login")
    end
    click_on("Logout")
    assert_equal "/", current_path
    assert page.has_content?("You have logged out.")
    refute page.has_content?("Welcome Test")
  end

end
