import { useTranslation } from '@/shared/lib/i18n'
import { useTheme } from '@/shared/lib/theme'
import { ModalData } from '@/shared/types/notifications'
import { BlurView } from 'expo-blur'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { MapPinIcon } from '../ui/icons/map-pin'

interface UniversalNotificationModalProps {
  isVisible: boolean
  onClose: () => void
  modalData: ModalData | null
}

export const UniversalNotificationModal: React.FC<
  UniversalNotificationModalProps
> = ({ isVisible, onClose, modalData }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  if (!modalData) return null

  const handleButtonPress = () => {
    modalData.onButtonPress()
    onClose()
  }

  const renderRouteOfferContent = (
    data: ModalData & { type: 'RouteOffer' },
  ) => (
    <>
      <MapPinIcon />
      <Text
        className="text-lg font-bold mb-2.5 text-center mt-2.5"
        style={{ color: theme.colors.text.primary }}>
        {t('modals.route_offer.title')}
      </Text>
      <Text
        className="text-sm text-center mb-1.5"
        style={{ color: theme.colors.text.secondary }}>
        {t('modals.route_offer.message')}
      </Text>
    </>
  )

  const renderFuelStationContent = (
    data: ModalData & { type: 'NearFuelStation' },
  ) => (
    <>
      <MapPinIcon />
      <Text
        className="text-lg font-bold mb-2.5 text-center mt-2.5"
        style={{ color: theme.colors.text.primary }}>
        {t('modals.fuel_station.title')}
      </Text>
      <Text
        className="text-sm text-center mb-1.5"
        style={{ color: theme.colors.text.secondary }}>
        {t('modals.fuel_station.message')}
      </Text>
      <Text
        className="text-sm text-center mb-1.5 font-medium"
        style={{ color: theme.colors.text.primary }}>
        {data.address}
      </Text>
      <Text
        className="text-xs text-center mb-5"
        style={{ color: theme.colors.text.secondary }}>
        {t('modals.distance')} {data.distance.toFixed(1)} {t('modals.miles')}
      </Text>
    </>
  )

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor="transparent"
      className="justify-center items-center m-0">
      <BlurView intensity={20} tint="dark" className="absolute inset-0" />
      <View
        className="rounded-3xl p-5 items-center w-4/5 max-w-[300px] shadow-lg"
        style={{ backgroundColor: theme.colors.background.secondary }}>
        {modalData.type === 'RouteOffer'
          ? renderRouteOfferContent(
              modalData as ModalData & { type: 'RouteOffer' },
            )
          : renderFuelStationContent(
              modalData as ModalData & { type: 'NearFuelStation' },
            )}
        <TouchableOpacity
          className="rounded-lg py-3 px-8 mt-2.5 w-full items-center"
          style={{ backgroundColor: theme.colors.primary[500] }}
          onPress={handleButtonPress}>
          <Text className="text-white text-base font-bold">
            {modalData.type === 'RouteOffer'
              ? t('modals.route_offer.button_accept')
              : t('modals.fuel_station.button_navigate')}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
