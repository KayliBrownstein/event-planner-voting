require 'spec_helper'

feature "User signs in" do
  let(:user) do
    User.create(
      username: "jarlax3",
      email: "jarlax3@launchacademy.com",
      password: 'password',
      first_name: 'Jar',
      last_name: 'Smith'
    )
  end

  scenario "successful login" do
    visit '/login'

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log In'

    expect(page).to have_content "If you're new to SYW"
  end

  scenario "unsuccessful login" do
    visit '/login'

    fill_in 'Email', with: 'nothinggood@aol.com'
    fill_in 'Password', with: user.password

    click_button 'Log In'

    expect(page).to have_content "Invalid credentials"
  end
end
