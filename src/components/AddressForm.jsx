import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import axiosInstance from '../services/axiosInstance';

const cities = [
  "Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane",
  "Hakkari", "Hatay", "Isparta", "İçel (Mersin)", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri",
  "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin",
  "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
  "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray",
  "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük",
  "Kilis", "Osmaniye", "Düzce"
];

function AddressForm({ onClose, editAddress = null, onAddressUpdate }) {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editAddress) {
      setFormData({
        ...editAddress,
        address: editAddress.address || ''
      });
    }
  }, [editAddress]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Adres başlığı gerekli';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ad gerekli';
    }
    
    if (!formData.surname.trim()) {
      newErrors.surname = 'Soyad gerekli';
    }
    
    const phoneRegex = /^(05)[0-9][0-9][1-9]([0-9]){6}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz (05XX XXX XX XX)';
    }
    
    if (!formData.city) {
      newErrors.city = 'İl seçimi gerekli';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'İlçe gerekli';
    }
    
    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'Mahalle gerekli';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Detaylı adres gerekli';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        title: formData.title,
        name: formData.name,
        surname: formData.surname,
        phone: formData.phone.replace(/\s/g, ''),
        city: formData.city.toLowerCase(),
        district: formData.district,
        neighborhood: formData.neighborhood,
        address: formData.address
      };

      if (editAddress) {
        await axiosInstance.put('/user/address', {
          id: editAddress.id,
          ...payload
        });
        toast.success('Adres güncellendi');
      } else {
        await axiosInstance.post('/user/address', payload);
        toast.success('Yeni adres eklendi');
      }
      
      onAddressUpdate();
      onClose();
    } catch (error) {
      console.error('Address save error:', error);
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (match) {
      return match
        .slice(1)
        .filter(Boolean)
        .join(' ');
    }
    return cleaned;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adres Başlığı
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg ${errors.title ? 'border-red-500' : ''}`}
              placeholder="örn: Ev adresi"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Soyad
              </label>
              <input
                type="text"
                value={formData.surname}
                onChange={(e) => setFormData({...formData, surname: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg ${errors.surname ? 'border-red-500' : ''}`}
              />
              {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: formatPhoneNumber(e.target.value)})}
              className={`w-full px-3 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="05XX XXX XX XX"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İl
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg ${errors.city ? 'border-red-500' : ''}`}
              >
                <option value="">İl Seçiniz</option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İlçe
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg ${errors.district ? 'border-red-500' : ''}`}
              />
              {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mahalle
            </label>
            <input
              type="text"
              value={formData.neighborhood}
              onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg ${errors.neighborhood ? 'border-red-500' : ''}`}
            />
            {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detaylı Adres
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg ${errors.address ? 'border-red-500' : ''}`}
              rows="3"
              placeholder="Sokak, bina ve kapı numarası gibi detayları giriniz"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editAddress ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddressForm; 