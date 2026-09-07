import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-ai-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chatbot.component.html',
  styleUrl: './ai-chatbot.component.css'
})
export class AiChatbotComponent {
  isOpen = signal<boolean>(false);
  userMessage = '';
  messages = signal<ChatMessage[]>([
    { sender: 'bot', text: 'Xin chào! ODYSSEY AI có thể giúp bạn chọn size hoặc tư vấn phối đồ?' }
  ]);

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;
    const input = this.userMessage;
    this.messages.update(list => [...list, { sender: 'user', text: input }]);
    this.userMessage = '';

    setTimeout(() => {
      let reply = 'Cảm ơn bạn! Cho mình xin chiều cao và cân nặng để tư vấn size nhé.';
      if (input.toLowerCase().includes('size')) {
        reply = 'Mẫu áo ODYSSEY form Loose: Dưới 65kg chọn M, 65-75kg chọn L, trên 75kg chọn XL ạ!';
      }
      this.messages.update(list => [...list, { sender: 'bot', text: reply }]);
    }, 800);
  }
}