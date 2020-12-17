<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address1',
        'address2',
        'city',
        'state',
        'zip',
    ];

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function order()
    {
        return $this->hasOne(Order::class);
    }
}
