<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'quantity', 'price', 'fulfilled'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
