<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function __construct()
    {
    }

    public function create(Request $request)
    {
        \Log::info("it's here", [
            'params' => $request
        ]);
        // check if user already exists, if so return error 'User already created ordered this product'
        
        // save user
        

        return 'help';
    }
}
