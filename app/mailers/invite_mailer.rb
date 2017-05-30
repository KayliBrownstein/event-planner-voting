class InviteMailer < ApplicationMailer
  def new_user_invite(invite)
    @invite = invite
    mail(to: @invite.email, subject: 'New Invite from SeeYouWhen')
  end

  def returning_user_invite(invite)
    @invite = invite
    mail(to: @invite.email, subject: 'New Invite from SeeYouWhen')
  end
end
