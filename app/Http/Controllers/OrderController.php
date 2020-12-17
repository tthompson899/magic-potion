<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Carbon;

class OrderController extends Controller
{
    public function create(Request $request)
    {
        $this->validateData($request);

        $data = $request->only(['name', 'email', 'address', 'phone', 'quantity', 'total', 'payment.creditCardNumber', 'payment.expirationDate']);

        // get current month
        $currentMonth = Carbon::now()->month();

        // check if user exists
        if ($findUser = User::where('email', $data['email'])->first()) {
            // check if users orders for the current month is greater than 3
            if ($findUser->order()->whereMonth('created_at', $currentMonth)->count() >= 3) {
                return 'You have reached your max order limit. Visit us again next month';
            }
        }

        // create user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'address1' => $data['address']['address1'],
            'address2' => $data['address']['address2'],
            'city' => $data['address']['city'],
            'state' => $data['address']['state'],
            'zip' => $data['address']['zip']
        ]);

        // create order for user
        $user->order()->create([
            'quantity' => $data['quantity'],
            'price' => $data['total']
        ]);

        // create payment for user
        $user->payment()->create([
            'credit_card_number' => $data['payment']['creditCardNumber'],
            'expiration_date' => $data['payment']['expirationDate']
        ]);

        // return order id for users order
        return ['success' => 'Your order has been placed!', 'id' => $user->order->id];
    }

    protected function validateData(Request $request)
    {
        $key = [
            'address.address1' => 'address1',
            'address.address2' => 'address2',
            'address.city' => 'city',
            'address.state' => 'state',
            'address.zip' => 'zip',
            'payment.creditCardNumber' => 'creditCardNumber',
            'payment.expirationDate' => 'expirationDate'
        ];

        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique',
            $key['address.address1'] => 'required|string',
            $key['address.address2'] => 'string',
            $key['address.city'] => 'required|string',
            $key['address.state'] => 'required|string',
            $key['address.zip'] => 'required|string',
            'phone' => 'required|string',
            'quantity' => 'integer|max:3',
            $key['payment.creditCardNumber'] => 'required|string',
            $key['payment.expirationDate'] => 'required|string'
        ]);

        \Log::info('validated', [
            'validation' => $validated
        ]);
        // if ($validated) {
        //     return true;
        // }

        // return the errors
        // return $validated->toArray();
    }
}
