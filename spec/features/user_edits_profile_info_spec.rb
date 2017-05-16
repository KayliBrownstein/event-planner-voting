require 'spec_helper'

feature "User edits their profile" do
  let!(:user) do
    User.create(
      id: 1,
      username: "jarlax3",
      email: "jarlax3@launchacademy.com",
      password: 'password',
      first_name: 'Jar',
      last_name: 'Smith'
    )
  end

  scenario "when user edits their info, their profile is updated" do
    visit '/users/1/edit'

    fill_in 'Username', with: "kbrown"
    fill_in 'First name', with: 'Kayli'
    fill_in 'Email', with: "testeremail@test.com"
    fill_in 'Password*', with: 'password'
    fill_in 'Password confirmation', with: 'password'

    click_button 'Edit my profile'

    user.reload
    expect(user.first_name).to eq("Kayli")
    expect(user.username).to eq("kbrown")
    expect(user.email).to eq("testeremail@test.com")
  end
end
