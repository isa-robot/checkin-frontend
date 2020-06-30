import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Buttons/Button';
import {
  Container,
  ModalCard,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputDiv,
  SelectDiv,
} from './styles';
import { newBaselineRequest } from '~/store/modules/user/actions';

export default function Modal({ toggle, toggleFunction }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(toggle);
  const { register, handleSubmit, errors } = useForm();

  const loading = useSelector(state => state.user.loading);

  useEffect(() => {
    setDisplay(toggle);
  }, [toggle]);

  function handleAnswer(data) {
    dispatch(newBaselineRequest(data));
    toggleFunction(String(loading));
  }

  return (
    <Container ref={ref} display={String(display)}>
      <form onSubmit={handleSubmit(handleAnswer)} autoComplete="off" noValidate>
        <ModalCard>
          <ModalHeader>
            <strong>
              Insira abaixo seus dados de perfil e histórico médico
            </strong>
          </ModalHeader>
          <ModalBody>
            <InputDiv>
              <input
                name="age"
                autoComplete="off"
                placeholder="-"
                maxLength="2"
                ref={register({ required: true, pattern: /^[0-9]*$/ })}
              />
              <label>Idade (anos)</label>
            </InputDiv>
            {errors.age && errors.age.type === 'required' && (
              <span>O campo Idade é obrigatório</span>
            )}
            {errors.age && errors.age.type === 'pattern' && (
              <span>O campo deve conter somente números</span>
            )}
            <SelectDiv>
              <select
                required
                name="genre"
                defaultValue=""
                ref={register({ required: true })}
              >
                <option disabled hidden />
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
              <label>Sexo</label>
            </SelectDiv>
            {errors.genre && <span>O campo Sexo é obrigatório</span>}
            <SelectDiv>
              <select
                required
                name="race"
                defaultValue=""
                ref={register({ required: true })}
              >
                <option disabled hidden />
                <option value="W">Branco</option>
                <option value="M">Mestiço</option>
                <option value="B">Negro</option>
              </select>
              <label>Raça</label>
            </SelectDiv>
            {errors.race && <span>O campo Raça é obrigatório</span>}
            <InputDiv>
              <input
                maxLength="3"
                name="weight"
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true, pattern: /^[0-9]*$/ })}
              />
              <label>Peso (kg)</label>
            </InputDiv>
            {errors.weight && errors.weight.type === 'required' && (
              <span>O campo Peso é obrigatório</span>
            )}
            {errors.weight && errors.weight.type === 'pattern' && (
              <span>O campo deve conter somente números</span>
            )}
            <InputDiv>
              <input
                maxLength="3"
                name="height"
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true, pattern: /^[0-9]*$/ })}
              />
              <label>Altura (cm)</label>
            </InputDiv>
            {errors.height && errors.height.type === 'required' && (
              <span>O campo Altura é obrigatório</span>
            )}
            {errors.height && errors.height.type === 'pattern' && (
              <span>O campo deve conter somente números</span>
            )}
            <InputDiv>
              <input
                name="city"
                type="text"
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true })}
              />
              <label>Cidade</label>
            </InputDiv>
            {errors.city && errors.city.type === 'required' && (
              <span>O campo Cidade é obrigatório</span>
            )}
            <InputDiv>
              <input
                type="text"
                name="occupation"
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true })}
              />
              <label>Ocupação</label>
            </InputDiv>
            {errors.occupation && errors.occupation.type === 'required' && (
              <span>O campo Ocupação é obrigatório</span>
            )}
            <InputDiv>
              <input
                type="text"
                name="occupation_local"
                autoComplete="off"
                placeholder="-"
                ref={register({ required: true })}
              />
              <label>Local (setor, sala, turma...)</label>
            </InputDiv>
            {errors.occupation_local &&
              errors.occupation_local.type === 'required' && (
                <span>O campo Local é obrigatório</span>
              )}
            <SelectDiv>
              <select
                name="recent_appointments"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Consultas Médicas Recentes</label>
            </SelectDiv>
            {errors.race && <span>O campo Consutas é obrigatório</span>}
            <SelectDiv>
              <select
                name="contact_covid19"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Contato alguém com COVID</label>
            </SelectDiv>
            {errors.contact_covid19 && (
              <span>O campo Contato é obrigatório</span>
            )}
            <SelectDiv>
              <select
                name="mask"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Utilização de mascara</label>
            </SelectDiv>
            {errors.mask && <span>O campo Mascara é obrigatório</span>}
            <SelectDiv>
              <select
                name="hypertension"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Hipertenção</label>
            </SelectDiv>
            {errors.hypertension && (
              <span>O campo Hipertenção é obrigatório</span>
            )}
            <SelectDiv>
              <select
                name="diabetes"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Diabete</label>
            </SelectDiv>
            {errors.diabetes && <span>O campo Diabete é obrigatório</span>}
            <SelectDiv>
              <select
                name="heart_disease"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Doença Cardíaca</label>
            </SelectDiv>
            {errors.heart_disease && (
              <span>O campo Doença Cardíaca é obrigatório</span>
            )}
            <SelectDiv>
              <select
                name="lung_disease"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Doença Pulmonar</label>
            </SelectDiv>
            {errors.lung_disease && (
              <span>O campo Doença Pulmonar é obrigatório</span>
            )}
            <SelectDiv>
              <select
                name="asthma"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Asma</label>
            </SelectDiv>
            {errors.asthma && <span>O campo Asma é obrigatório</span>}
            <SelectDiv>
              <select
                name="smoking"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Tabagismo</label>
            </SelectDiv>
            {errors.smoking && <span>O campo Tabagismo é obrigatório</span>}
            <SelectDiv>
              <select
                name="kidney_disease"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Doença Renal</label>
            </SelectDiv>
            {errors.kidney_disease && (
              <span>O campo Doença Renal é obrigatório</span>
            )}
            <SelectDiv>
              <select
                name="cancer"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Cancer</label>
            </SelectDiv>
            {errors.cancer && <span>O campo Cancer é obrigatório</span>}
            <SelectDiv>
              <select
                name="corticosteroids_or_methotrexate"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Corticóides ou Metotrexate</label>
            </SelectDiv>
            {errors.corticosteroids_or_methotrexate && (
              <span>O campo Corticóides é obrigatório</span>
            )}
            <SelectDiv>
              <select
                name="gestation"
                defaultValue=""
                ref={register({ required: true })}
                required
              >
                <option disabled hidden />
                <option value>Sim</option>
                <option value={false}>Não</option>
              </select>
              <label>Gestação</label>
            </SelectDiv>
            {errors.gestation && <span>O campo Gestação é obrigatório</span>}
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="white"
              backgroundColor="mountainMeadow"
              width="150px"
              height="50px"
            >
              <p> {loading ? 'Enviando...' : 'Enviar'}</p>
            </Button>
          </ModalFooter>
        </ModalCard>
      </form>
    </Container>
  );
}

Modal.propTypes = {
  toggle: PropTypes.bool,
  toggleFunction: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  toggle: false,
};
