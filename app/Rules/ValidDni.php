<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class ValidDni implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // DNI format: 8 numbers followed by a letter
        if (!preg_match('/^[0-9]{8}[A-Z]$/', strtoupper($value))) {
            $fail('The :attribute must be a valid DNI format (8 numbers followed by a letter).');
            return;
        }

        // Extract the number and letter
        $number = substr($value, 0, 8);
        $letter = strtoupper(substr($value, 8, 1));

        // Calculate the expected letter
        $expectedLetter = $this->calculateDniLetter($number);

        // Check if the letter is correct
        if ($letter !== $expectedLetter) {
            $fail('The letter in the :attribute is not valid for the given number.');
        }
    }

    /**
     * Calculate the expected letter for a DNI number based on modulo 23.
     * The Spanish DNI validation uses modulo 23, not 13.
     *
     * @param string $number The 8-digit DNI number
     * @return string The expected letter
     */
    private function calculateDniLetter(string $number): string
    {
        // The sequence of valid letters for DNI
        $validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
        
        // Calculate the remainder of the division by 23
        $remainder = intval($number) % 23;
        
        // Get the corresponding letter
        return $validLetters[$remainder];
    }
}
