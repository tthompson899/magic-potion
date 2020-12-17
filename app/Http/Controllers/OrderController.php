<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Carbon;

class OrderController extends Controller
{
    public function create(Request $request)
    {
        $this->validateData($request);

        $data = $request->only(['name', 'email', 'address', 'phone', 'quantity', 'total', 'payment.creditCardNumber', 'payment.expirationDate']);

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
        return ['message' => 'Your order has been placed!', 'id' => $user->order->id];
    }

    protected function validateData(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'address.address1' => 'required|string',
            'address.address2' => 'nullable|string',
            'address.city' => 'required|string',
            'address.state' => 'required|string',
            'address.zip' => 'required|string',
            'phone' => 'required|string',
            'quantity' => 'integer|max:3',
            'payment.creditCardNumber' => 'required|string',
            'payment.expirationDate' => 'required|string'
        ]);
    }

    public function get()
    {
        // get the first user
        if (! $user = User::with('order', 'payment')->first()) {
            return ['message' => 'resource not found'];
        }

        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'address' => [
                'street1' => $user->address1,
                'street2' => $user->address2,
                'city' => $user->city,
                'state' => $user->state,
                'zip' => $user->zip,
            ],
            'phone' => $user->phone,
            'payment' => [
                'ccNum' => $user->payment->credit_card_number,
                'exp' => $user->payment->expiration_date
            ],
            'quantity' => $user->order->quantity,
            'total' => $user->order->price,
            'orderDate' => $user->order->created_at->toDateTimeString(),
            'fulfilled' => $user->order->fulfilled
        ];
        
        return $data;
    }

    public function update(Request $request)
    {
        $params = $request;

        if (! $order = Order::find($params['id'])) {
            return ['message' => 'resource not found'];
        }

        $order->update(['fulfilled' => (bool)$params['fulfilled']]);

        return ['message' => 'resource updated successfully'];
    }

    public function delete($id)
    {
        // find the order
        if (! $order = Order::find($id)) {
            return ['message' => 'resource not found'];
        }

        $userId = $order->user->id;

        $order->delete();
        User::find($userId)->payment->delete();
        
        return ['message' => 'resource deleted successfully'];
    }
}
