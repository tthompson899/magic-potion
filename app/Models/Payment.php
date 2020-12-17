<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'credit_card_number', 'expiration_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
