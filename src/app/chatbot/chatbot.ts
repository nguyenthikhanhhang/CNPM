import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotComponent {
  isOpen = false;
  userText = '';
  messages = [
    { sender: 'bot', text: 'Xin chào! Mình là trợ lý AI của ODYDDEY 👔. Mình có thể hỗ trợ bạn chọn size áo/quần hoặc tra cứu đơn hàng!' }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userText.trim()) return;

    const input = this.userText;
    this.messages.push({ sender: 'user', text: input });
    this.userText = '';

    setTimeout(() => {
      let reply = 'Cảm ơn bạn! Nhân viên CSKH ODYDDEY sẽ liên hệ tư vấn thêm cho bạn.';
      const txt = input.toLowerCase();

      if (txt.includes('size') || txt.includes('tư vấn') || txt.includes('cao')) {
        reply = 'Bạn cung cấp giúp mình **Chiều cao (cm)** và **Cân nặng (kg)** để mình gợi ý size ODYDDEY chuẩn nhất nhé!';
      } else if (txt.includes('đơn hàng') || txt.includes('giao')) {
        reply = 'Bạn cho mình xin **Mã đơn hàng** hoặc **SĐT** đặt hàng để tra cứu tiến độ nhé.';
      }

      this.messages.push({ sender: 'bot', text: reply });
    }, 500);
  }
}