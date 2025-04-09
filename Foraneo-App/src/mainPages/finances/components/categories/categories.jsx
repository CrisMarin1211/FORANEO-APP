import { useState } from 'react';
import './categories.css';
import {
  Utensils, Bus, PartyPopper, Home, BookOpenCheck, User, Gamepad2, Heart, BanknoteArrowDown, Gift, AlertTriangle, MoreHorizontal, Banknote, BriefcaseBusiness
} from 'lucide-react';

const Categories = ({ isIncome, setSelectedCategory }) => {
  const categorieTypes = isIncome ? ['Salary', 'Business', 'Investment', 'Other Income'] : ['Food', 'Transport', 'Fun', 'Home', 'Study', 'Games', 'Health', 'Personal', 'Debt & Loans', 'Gifts', 'Urgency', 'Other'];

  const categoryIcons = {
    'Salary': Banknote,
    'Investment': BookOpenCheck,
    'Business': BriefcaseBusiness,
    'Food': Utensils,
    'Transport': Bus,
    'Fun': PartyPopper,
    'Study': BookOpenCheck,
    'Personal': User,
    'Games': Gamepad2,
    'Health': Heart,
    'Debt & Loans': BanknoteArrowDown,
    'Home': Home,
    'Gifts': Gift,
    'Urgency': AlertTriangle,
    'Other': MoreHorizontal,
  };

  const [SelectedCategory, setCategory] = useState(categorieTypes[0]);

  const handleSelect = (type) => {
    setCategory(type);
    setSelectedCategory(type); // Pasar la categoría seleccionada al componente principal
  };

  return (
    <section className='categorie-title'>
      <h2 className='categorie-selector-title'>1. Select the category</h2>
      <section className='categorie-selector-container'>
        <section className='categorie-options-container'>
          {categorieTypes.map((type) => {
            const Icon = categoryIcons[type] || MoreHorizontal;
            return (
              <section
                key={type}
                className={`categorie-option-container`}
                onClick={() => handleSelect(type)}
              >
                <section
                  className={`categorie-option ${SelectedCategory === type ? 'selected' : ''}`}
                >
                  <Icon className="category-icon" size={10} />
                </section>
                <span className="categorie-label">{type}</span>
              </section>
            );
          })}
        </section>
      </section>
    </section>
  );
};

export default Categories;
