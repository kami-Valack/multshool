<?php

namespace App\Services;

use Illuminate\Support\Facades\View;

class EmailTemplateService
{
    /**
     * Get email template path for type.
     */
    public function getTemplatePath(string $emailType): string
    {
        $templateMap = [
            EmailType::VERIFICACAO_CONTA => 'emails.verificacao-conta',
            EmailType::RECUPERACAO_SENHA => 'emails.recuperacao-senha',
            EmailType::NOTIFICACAO => 'emails.notificacao',
            EmailType::NOTIFICACAO_PAGAMENTO => 'emails.notificacao-pagamento',
        ];

        return $templateMap[$emailType] ?? 'emails.default';
    }

    /**
     * Render email template with data.
     */
    public function render(string $emailType, array $data): string
    {
        $template = $this->getTemplatePath($emailType);
        
        return View::make($template, $data)->render();
    }

    /**
     * Get email subject for type.
     */
    public function getSubject(string $emailType, array $data = []): string
    {
        $subjectMap = [
            EmailType::VERIFICACAO_CONTA => 'Verifique sua conta - MultiShol',
            EmailType::RECUPERACAO_SENHA => 'Recuperação de senha - MultiShol',
            EmailType::NOTIFICACAO => 'Notificação - MultiShol',
            EmailType::NOTIFICACAO_PAGAMENTO => 'Notificação de pagamento - MultiShol',
        ];

        return $subjectMap[$emailType] ?? 'Notificação - MultiShol';
    }
}

