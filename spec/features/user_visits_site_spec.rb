require 'rails_helper'

feature "Unauthenticated user visits site" do

  scenario "User is prompted to sign in or log in" do
    visit '/'

    expect(page).to have_content "Welcome to SeeYouWhen"
    expect(page).to have_content "Please Sign Up or Log In before continuing!"
  end
end
