<?php

namespace App\Notifications;

use App\Models\Campaign;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CampaignParticipationNotification extends Notification
{
    use Queueable;

    protected $participant;
    protected $campaign;

    /**
     * Create a new notification instance.
     */
    public function __construct(User $participant, Campaign $campaign)
    {
        $this->participant = $participant;
        $this->campaign = $campaign;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('A new participant has registered for your campaign.')
            ->line('Participant Name: '.$this->participant->name)
            ->line('Campaign Name: '.$this->campaign->name)
            ->action('View Campaign', url('/organization/campaigns'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
