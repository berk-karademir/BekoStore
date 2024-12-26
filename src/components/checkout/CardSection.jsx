import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSavedCards,
  saveCard,
  updateCard,
  deleteCard,
  setShowCardForm,
  setEditCard,
  setSelectedCard
} from '../../store/actions/checkoutActions';

const CardSection = () => {
  const dispatch = useDispatch();
  const {
    savedCards,
    selectedCard,
    showCardForm,
    editCard,
    isLoading
  } = useSelector((state) => state.checkout);

  const [formData, setFormData] = React.useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: ''
  });

  React.useEffect(() => {
    dispatch(fetchSavedCards());
  }, [dispatch]);

  React.useEffect(() => {
    if (editCard) {
      setFormData({
        card_no: editCard.card_no,
        expire_month: editCard.expire_month,
        expire_year: editCard.expire_year,
        name_on_card: editCard.name_on_card
      });
    } else {
      setFormData({
        card_no: '',
        expire_month: '',
        expire_year: '',
        name_on_card: ''
      });
    }
  }, [editCard]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editCard) {
      dispatch(updateCard({ ...formData, id: editCard.id }));
    } else {
      dispatch(saveCard(formData));
    }
  };

  const handleDelete = (cardId) => {
    dispatch(deleteCard(cardId));
  };

  const handleEdit = (card) => {
    dispatch(setEditCard(card));
    dispatch(setShowCardForm(true));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Kayıtlı Kartlarım</h2>
        <button
          onClick={() => dispatch(setShowCardForm(true))}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Yeni Kart Ekle
        </button>
      </div>

      {showCardForm && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kart Üzerindeki İsim
            </label>
            <input
              type="text"
              name="name_on_card"
              value={formData.name_on_card}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kart Numarası
            </label>
            <input
              type="text"
              name="card_no"
              value={formData.card_no}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              maxLength="16"
              pattern="\d{16}"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Son Kullanma Ay
              </label>
              <select
                name="expire_month"
                value={formData.expire_month}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Ay Seçin</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month}>
                    {month.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Son Kullanma Yıl
              </label>
              <select
                name="expire_year"
                value={formData.expire_year}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Yıl Seçin</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                dispatch(setShowCardForm(false));
                dispatch(setEditCard(null));
              }}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isLoading.saveCard || isLoading.updateCard}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading.saveCard || isLoading.updateCard
                ? 'Kaydediliyor...'
                : editCard
                ? 'Güncelle'
                : 'Kaydet'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {isLoading.cards ? (
          <div className="text-center py-4">Kartlar yükleniyor...</div>
        ) : savedCards.length === 0 ? (
          <div className="text-center py-4 text-gray-500">Kayıtlı kart bulunmamaktadır.</div>
        ) : (
          savedCards.map((card) => (
            <div
              key={card.id}
              className={`p-4 border rounded ${
                selectedCard?.id === card.id ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{card.name_on_card}</p>
                  <p className="text-gray-600">
                    **** **** **** {card.card_no.slice(-4)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Son Kullanma: {card.expire_month.toString().padStart(2, '0')}/{card.expire_year}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => dispatch(setSelectedCard(card))}
                    className={`px-3 py-1 rounded ${
                      selectedCard?.id === card.id
                        ? 'bg-blue-500 text-white'
                        : 'border border-blue-500 text-blue-500'
                    }`}
                  >
                    {selectedCard?.id === card.id ? 'Seçili' : 'Seç'}
                  </button>
                  <button
                    onClick={() => handleEdit(card)}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    disabled={isLoading.deleteCard}
                    className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardSection; 