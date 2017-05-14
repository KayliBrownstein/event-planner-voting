require 'spec_helper'

feature "User sees all their events" do
  let(:event) do
    User.create(
      id: 1,
      username: "jarlax3",
      email: "jarlax3@launchacademy.com",
      password: 'password',
      first_name: 'Jar',
      last_name: 'Smith'
    )
    Event.create(
      id: 1,
      user_id: 1,
      name: "Birthday Party",
      description: 'This is a description. This is a description. This is a
        description. This is a description. This is a description. This is a description.',
      cutoff_time: "2017-05-29"
    )
  end

  scenario "when user visits home page, they see all of their events" do
    visit '/events'

    expect(page).to have_content `#{event.name}`
    expect(page).to have_content `#{event.description}`
    expect(page).to have_content `#{event.cutoff_time}`
  end
end
