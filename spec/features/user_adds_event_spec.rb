require 'spec_helper'

feature "User adds an event" do
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
        description. This is a description. This is a description. This is a
        description.',
      cutoff_time: "Monday"
    )
  end

  scenario "when user visits page, user can add an event" do
    visit '/events'

    expect(page).to have_content `#{event.name}`
  end
end
