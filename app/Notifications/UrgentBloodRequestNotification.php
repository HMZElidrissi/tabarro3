<?php

namespace App\Notifications;

use App\Models\BloodRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UrgentBloodRequestNotification extends Notification
{
    use Queueable;

    public $bloodRequest;

    /**
     * Create a new notification instance.
     */
    public function __construct(BloodRequest $bloodRequest)
    {
        $this->bloodRequest = $bloodRequest;
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
             ->subject('Alerte de besoin de sang urgent')
             ->line('Une donation de sang urgente est nécessaire.')
             ->line('Description: '.$this->bloodRequest->description)
             ->line('Groupe sanguin: '.$this->bloodRequest->blood_group)
             ->line('Ville: '.$this->bloodRequest->city)
             ->action('Voir les détails', url('/requests'))
             ->line('Merci pour votre attention à ce besoin urgent!');
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
