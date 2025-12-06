import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-8 h-8 mb-4" />,
    title: "Free Shipping",
    desc: "Miễn phí vận chuyển cho đơn hàng trên 2 triệu."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 mb-4" />,
    title: "Secure Payment",
    desc: "Thanh toán an toàn, bảo mật tuyệt đối 100%."
  },
  {
    icon: <RefreshCw className="w-8 h-8 mb-4" />,
    title: "Easy Return",
    desc: "Đổi trả trong vòng 30 ngày nếu lỗi từ nhà sản xuất."
  },
  {
    icon: <Zap className="w-8 h-8 mb-4" />,
    title: "Fast Delivery",
    desc: "Giao hàng hỏa tốc nội thành trong 2h."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-brand-dark dark:bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="text-gray-400 group-hover:text-brand-accent transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 tracking-wide text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400 font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;