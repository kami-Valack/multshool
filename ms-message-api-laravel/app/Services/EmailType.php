<?php

namespace App\Services;

class EmailType
{
    const VERIFICACAO_CONTA = 'verificacao de conta';
    const RECUPERACAO_SENHA = 'recuperacao de senha';
    const NOTIFICACAO = 'notificacao';
    const NOTIFICACAO_PAGAMENTO = 'notificacao de pagamento';

    /**
     * Get all email types.
     */
    public static function all(): array
    {
        return [
            self::VERIFICACAO_CONTA,
            self::RECUPERACAO_SENHA,
            self::NOTIFICACAO,
            self::NOTIFICACAO_PAGAMENTO,
        ];
    }

    /**
     * Check if email type is valid.
     */
    public static function isValid(string $type): bool
    {
        return in_array($type, self::all());
    }
}

