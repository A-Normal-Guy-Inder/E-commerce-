import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  ngOnInit(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

   faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, UPI, and net banking.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Tracking details will be emailed to you once your order is shipped.'
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order before it is shipped.'
    },
    {
      question: 'What if I receive a damaged product?',
      answer: 'Contact us within 48 hours with photos. We’ll arrange a replacement or refund.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within India. International shipping coming soon.'
    },
    {
      question: 'How do I modify or cancel my order?',
      answer: 'Reach out to support before your order is shipped.'
    },
    {
      question: 'Is cash on delivery (COD) available?',
      answer: 'Yes, COD is available for orders below ₹2000.'
    },
    {
      question: 'Can I return sale or discounted items?',
      answer: 'Yes, unless marked as "Final Sale". Standard return policy applies.'
    }
  ];
}
