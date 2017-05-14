require 'spec_helper'

feature "User signs in" do

  scenario "successful signup" do
    visit '/'

    click_link 'Sign Up'

    fill_in 'Username', with: "jarlax3"
    fill_in 'First name', with: 'Jar'
    fill_in 'Last name', with: 'Smith'
    fill_in 'Email', with: "test123@launchacademy.com"
    fill_in 'Password*', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_button 'Create my account'

    expect(page).to have_content "You have signed up successfully!"
  end

  scenario "unsuccessful signup" do
    visit '/'

    click_link 'Sign Up'

    fill_in 'Username', with: "jarlax3"
    fill_in 'First name', with: 'Jar'
    fill_in 'Email', with: "test123@launchacademy.com"
    fill_in 'Password*', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_button 'Create my account'

    expect(page).to have_content "The form contains"
  end
end
