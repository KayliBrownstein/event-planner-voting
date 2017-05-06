require "rails_helper"

feature "profile photo" do
  scenario "user uploads a profile photo" do
    visit root_path
    click_link("Sign Up", :match => :first)

    fill_in "Username", with: "kbrown"
    fill_in "First name", with: "Kayli"
    fill_in "Last name", with: "Brownstein"
    fill_in "Email", with: "brown@aol.com"
    fill_in "Password", with: "password123"
    fill_in "Password confirmation", with: "password123"
    attach_file("Avatar", Rails.root + "spec/support/images/Pug_hero.jpg")
    click_button "Create my account"

    expect(page).to have_content("You have signed up successfully!")

    click_link "Get Started"
    # click_link "My Profile"

    # expect(page).to have_css("img[src*='Pug_hero.jpg']")
  end
end
