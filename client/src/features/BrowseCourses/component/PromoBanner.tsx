'use client';

import React from 'react';
import { Clock, FileText } from 'lucide-react';

interface PromobannerProps {
  badge?: string;
  title?: string;
  description?: string;
  trainingHours?: string;
  certification?: string;
  originalPrice?: string;
  currentPrice?: string;
  currency?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const PromoBanner: React.FC<PromobannerProps> = ({
  badge = "عرض خاص لفترة محدودة",
  title = "دبلومة التسويق الرقمي المتكاملة",
  description = "تعلم أسرار التسويق عبر منصات التواصل الاجتماعي، تحسين محركات البحث، وإدارة الحملات الإعلانية الممولة من كبار الخبراء.",
  trainingHours = "40",
  certification = "شهادة معتمدة",
  originalPrice = "3,500",
  currentPrice = "2,400",
  currency = "ج.م",
  buttonText = "سجل الآن",
  onButtonClick = () => alert('تم الضغط على الزر'),
  className = "",
}) => {
  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${className}`}>
      <div className="relative bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Background image overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop")',
            backgroundPosition: 'right center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 p-8 md:p-12 max-w-2xl">
          {/* Badge */}
          <div className="inline-block bg-teal-500 text-white px-4 py-2 rounded-full mb-6 text-sm font-semibold">
            {badge}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-right">
            {title}
          </h1>

          {/* Description */}
          <p className="text-white text-lg mb-8 text-right leading-relaxed">
            {description}
          </p>

          {/* Info Items */}
          <div className="flex gap-6 mb-8 flex-row-reverse">
            {/* Training Hours */}
            <div className="flex items-center gap-3 text-white">
              <span className="text-right">
                <div className="font-semibold">{trainingHours} ساعة تدريبية</div>
              </span>
              <Clock className="w-6 h-6 flex-shrink-0" />
            </div>

            {/* Certification */}
            <div className="flex items-center gap-3 text-white">
              <span className="text-right font-semibold">{certification}</span>
              <FileText className="w-6 h-6 flex-shrink-0" />
            </div>
          </div>

          {/* Price and Button Container */}
          <div className="flex items-center gap-6 flex-wrap">
            {/* Price Section */}
            <div className="flex items-baseline gap-3 text-right">
              <span className="text-white text-lg">{currency}</span>
              <span className="text-white text-2xl font-bold">{currentPrice}</span>
              <span className="text-white text-lg line-through opacity-75">{originalPrice}</span>
            </div>

            {/* CTA Button */}
            <button
            suppressHydrationWarning
              onClick={onButtonClick}
              className="bg-amber-400 hover:bg-amber-500 transition-colors text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl text-lg"
              aria-label={buttonText}
            >
              {buttonText}
              <br />
              <span className="text-sm">{currency}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;